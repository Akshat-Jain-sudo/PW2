import { useState, useEffect, useCallback } from 'react';

export interface LeetCodeStats {
  totalSolved: number;
  ranking: number;
  easySolved: number;
  totalEasy: number;
  mediumSolved: number;
  totalMedium: number;
  hardSolved: number;
  totalHard: number;
  totalQuestions: number;
  totalSubmissions: number;
  acceptanceRate: string;
  contributionPoint: number;
  lastUpdated: string;
}

export const FALLBACK_LEETCODE_STATS: LeetCodeStats = {
  totalSolved: 734,
  ranking: 90004,
  easySolved: 277,
  totalEasy: 976,
  mediumSolved: 404,
  totalMedium: 2148,
  hardSolved: 53,
  totalHard: 991,
  totalQuestions: 4115,
  totalSubmissions: 1669,
  acceptanceRate: '72.4%',
  contributionPoint: 313,
  lastUpdated: 'Live Benchmark',
};

const CACHE_KEY = 'akshat_leetcode_stats_v1';
const CACHE_TTL_MS = 10 * 60 * 1000; // 10 minutes cache

export function useLeetCodeStats(username: string = 'wRTkNlWd5L') {
  const [stats, setStats] = useState<LeetCodeStats>(() => {
    try {
      const cached = localStorage.getItem(`${CACHE_KEY}_${username}`);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (parsed && typeof parsed.totalSolved === 'number') {
          return parsed;
        }
      }
    } catch {
      // ignore storage error
    }
    return FALLBACK_LEETCODE_STATS;
  });

  const [loading, setLoading] = useState(false);
  const [isLive, setIsLive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastSynced, setLastSynced] = useState<Date | null>(null);

  const fetchStats = useCallback(
    async (isManual: boolean = false) => {
      // Check cache validity on mount
      if (!isManual) {
        try {
          const timestamp = localStorage.getItem(`${CACHE_KEY}_${username}_ts`);
          if (timestamp && Date.now() - Number(timestamp) < CACHE_TTL_MS) {
            setIsLive(true);
            return;
          }
        } catch {
          // ignore cache read error
        }
      }

      setLoading(true);
      setError(null);

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 9000);

      try {
        const res = await fetch(`https://alfa-leetcode-api.onrender.com/userProfile/${username}`, {
          signal: controller.signal,
        });

        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }

        const data = await res.json();
        clearTimeout(timeoutId);

        if (data && typeof data.totalSolved === 'number') {
          const totalSubmissions =
            Array.isArray(data.totalSubmissions) && data.totalSubmissions[0]
              ? data.totalSubmissions[0].submissions
              : (data.matchedUserStats?.totalSubmissionNum?.[0]?.submissions ?? 1669);

          const acSubmissions =
            Array.isArray(data.matchedUserStats?.acSubmissionNum) && data.matchedUserStats.acSubmissionNum[0]
              ? data.matchedUserStats.acSubmissionNum[0].submissions
              : data.totalSolved || 734;

          const rate =
            totalSubmissions > 0
              ? `${((acSubmissions / totalSubmissions) * 100).toFixed(1)}%`
              : '72.4%';

          const freshStats: LeetCodeStats = {
            totalSolved: data.totalSolved,
            ranking: data.ranking || 90004,
            easySolved: data.easySolved ?? 277,
            totalEasy: data.totalEasy ?? 976,
            mediumSolved: data.mediumSolved ?? 404,
            totalMedium: data.totalMedium ?? 2148,
            hardSolved: data.hardSolved ?? 53,
            totalHard: data.totalHard ?? 991,
            totalQuestions: data.totalQuestions ?? 4115,
            totalSubmissions,
            acceptanceRate: rate,
            contributionPoint: data.contributionPoint ?? 313,
            lastUpdated: new Date().toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
            }),
          };

          setStats(freshStats);
          setIsLive(true);
          setLastSynced(new Date());

          try {
            localStorage.setItem(`${CACHE_KEY}_${username}`, JSON.stringify(freshStats));
            localStorage.setItem(`${CACHE_KEY}_${username}_ts`, Date.now().toString());
          } catch {
            // ignore storage error
          }
        }
      } catch (err: unknown) {
        clearTimeout(timeoutId);
        const message = err instanceof Error ? err.message : 'Telemetry sync paused';
        setError(message);
        // keep pre-seeded fallback
      } finally {
        setLoading(false);
      }
    },
    [username]
  );

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return {
    stats,
    loading,
    isLive,
    error,
    lastSynced,
    refetch: () => fetchStats(true),
  };
}
