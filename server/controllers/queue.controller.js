import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getQueue = async (req, res) => {
  try {
    const queue = await prisma.queueItem.findMany({
      orderBy: { createdAt: 'asc' }
    });
    res.json(queue);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const addQueue = async (req, res) => {
  try {
    const { orderId, estimatedSeconds } = req.body;
    const newItem = await prisma.queueItem.create({
      data: {
        orderId: orderId || '-',
        estimatedSeconds: parseInt(estimatedSeconds) || 3600,
        status: 'WAIT FOR PRINT',
        elapsedSeconds: 0
      }
    });
    res.status(201).json(newItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const startPrint = async (req, res) => {
  try {
    const { id } = req.params;

    const activePrint = await prisma.queueItem.findFirst({
      where: { status: 'PRINTING' }
    });
    if (activePrint) {
      return res.status(400).json({ message: 'มีงานกำลังพิมพ์อยู่แล้ว' });
    }

    const item = await prisma.queueItem.findUnique({ where: { id: parseInt(id) } });
    if (!item) return res.status(404).json({ message: 'ไม่พบคิวนี้' });

    // Adjust startTime so timeRemaining = estimatedSeconds - elapsedSeconds
    const adjustedStart = new Date(Date.now() - item.elapsedSeconds * 1000);

    const updatedItem = await prisma.queueItem.update({
      where: { id: parseInt(id) },
      data: { status: 'PRINTING', startTime: adjustedStart }
    });
    res.json(updatedItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const stopPrint = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await prisma.queueItem.findUnique({ where: { id: parseInt(id) } });
    if (!item || !item.startTime) return res.status(400).json({ message: 'ไม่พบข้อมูล' });

    const elapsed = Math.floor((Date.now() - new Date(item.startTime).getTime()) / 1000);
    const newElapsed = Math.min(item.estimatedSeconds, item.elapsedSeconds + elapsed);

    const updatedItem = await prisma.queueItem.update({
      where: { id: parseInt(id) },
      data: { status: 'PAUSED', startTime: null, elapsedSeconds: newElapsed }
    });
    res.json(updatedItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const resetPrint = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedItem = await prisma.queueItem.update({
      where: { id: parseInt(id) },
      data: { status: 'WAIT FOR PRINT', startTime: null, elapsedSeconds: 0 }
    });
    res.json(updatedItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const completePrint = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedItem = await prisma.queueItem.update({
      where: { id: parseInt(id) },
      data: { status: 'DONE', startTime: null }
    });
    res.json(updatedItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteQueue = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.queueItem.delete({ where: { id: parseInt(id) } });
    res.json({ message: 'Queue item deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
