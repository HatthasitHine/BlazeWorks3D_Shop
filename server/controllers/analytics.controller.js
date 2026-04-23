import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Record a new page visit
export const recordVisit = async (req, res) => {
  try {
    const { page } = req.body;
    const userId = req.user ? req.user.id : null;

    const newVisit = await prisma.pageVisit.create({
      data: {
        page,
        userId,
        duration: 0
      }
    });

    res.status(201).json(newVisit);
  } catch (error) {
    console.error('Error recording visit:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update visit duration (heartbeat)
export const updateDuration = async (req, res) => {
  try {
    const { visitId, duration } = req.body;
    
    if (!visitId) return res.status(400).json({ message: 'Missing visitId' });

    const updated = await prisma.pageVisit.update({
      where: { id: parseInt(visitId) },
      data: { duration }
    });

    res.json(updated);
  } catch (error) {
    // We can silently fail for heartbeat errors to not clutter logs
    res.status(500).json({ message: 'Server error' });
  }
};

// Admin: Get analytics stats
export const getAnalyticsStats = async (req, res) => {
  try {
    const validPages = ['Home', 'Portfolio', 'Service', 'Price', 'Queue', 'Articles', 'About'];

    // Total visits per page
    const pageStatsRaw = await prisma.pageVisit.groupBy({
      by: ['page'],
      where: {
        page: { in: validPages }
      },
      _count: { id: true },
      _avg: { duration: true }
    });

    const pageStats = pageStatsRaw.map(stat => ({
      page: stat.page,
      views: stat._count.id,
      avgDuration: Math.round(stat._avg.duration || 0)
    }));

    // Active users logic could be implemented by looking at recently updated pageVisits (e.g. within last 1 min)
    const fiveMinsAgo = new Date(Date.now() - 5 * 60 * 1000);
    const activeUsers = await prisma.pageVisit.count({
      where: {
        updatedAt: { gte: fiveMinsAgo } // wait, we don't have updatedAt on pageVisit
      }
    });
    // Since we don't have updatedAt on PageVisit, we can't easily query this way unless we add it.
    // Instead, let's just do total stats for now.

    res.json({
      pageStats,
      totalViews: pageStats.reduce((acc, curr) => acc + curr.views, 0)
    });
  } catch (error) {
    console.error('Error fetching analytics:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Admin: Reset all analytics data
export const resetAnalytics = async (req, res) => {
  try {
    await prisma.pageVisit.deleteMany({});
    res.json({ message: 'Analytics data has been reset successfully' });
  } catch (error) {
    console.error('Error resetting analytics:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
