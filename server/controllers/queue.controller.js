import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getQueue = async (req, res) => {
  try {
    const queue = await prisma.queueItem.findMany({
      orderBy: {
        createdAt: 'asc'
      }
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
        status: 'WAIT FOR PRINT'
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
    
    // Check if any other item is currently printing
    const activePrint = await prisma.queueItem.findFirst({
      where: { status: 'PRINTING' }
    });
    
    if (activePrint) {
      return res.status(400).json({ message: 'There is already a job printing' });
    }

    const updatedItem = await prisma.queueItem.update({
      where: { id: parseInt(id) },
      data: {
        status: 'PRINTING',
        startTime: new Date()
      }
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
      data: {
        status: 'WAIT FOR PRINT',
        startTime: null
      }
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
    await prisma.queueItem.delete({
      where: { id: parseInt(id) }
    });
    res.json({ message: 'Queue item deleted' });
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
      data: {
        status: 'DONE'
      }
    });
    res.json(updatedItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
