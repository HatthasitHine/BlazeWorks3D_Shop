import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Get all portfolio items
export const getPortfolioItems = async (req, res) => {
  try {
    const items = await prisma.portfolioItem.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(items);
  } catch (error) {
    console.error('Error fetching portfolio items:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create a new portfolio item
export const createPortfolioItem = async (req, res) => {
  try {
    const { partName, printTime, price, material } = req.body;
    let imageUrl = '';

    if (req.file) {
      imageUrl = `http://localhost:3001/uploads/${req.file.filename}`;
    }

    const newItem = await prisma.portfolioItem.create({
      data: {
        partName,
        material: material || '',
        printTime,
        price,
        imageUrl
      }
    });

    res.status(201).json(newItem);
  } catch (error) {
    console.error('Error creating portfolio item:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update a portfolio item
export const updatePortfolioItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { partName, printTime, price, material } = req.body;
    
    // Check if new image was uploaded
    let updateData = {
      partName,
      material: material || '',
      printTime,
      price
    };

    if (req.file) {
      updateData.imageUrl = `http://localhost:3001/uploads/${req.file.filename}`;
    }

    const updatedItem = await prisma.portfolioItem.update({
      where: { id: parseInt(id) },
      data: updateData
    });

    res.json(updatedItem);
  } catch (error) {
    console.error('Error updating portfolio item:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a portfolio item
export const deletePortfolioItem = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.portfolioItem.delete({
      where: { id: parseInt(id) }
    });
    res.json({ message: 'Deleted successfully' });
  } catch (error) {
    console.error('Error deleting portfolio item:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
