// controllers/toyController.js

import express from "express";
import mongoose from "mongoose";


import Toy from "../models/toyModel";

export const getToys = async (req, res) => {
    try {
      let query = {};
  
      if (req.query?.email) {
        query = { email: req.query.email };
      } else if (req.query.toy_name) {
        const toyNameRegex = new RegExp(req.query.toy_name, 'i');
        query.toy_name = toyNameRegex;
      } else if (req.query.category) {
        const categoryRegex = new RegExp(req.query.category, 'i');
        query.category = categoryRegex;
      }
  
      const sortField = req.query.sort || 'price';
      const sortOrder = req.query.order === 'desc' ? -1 : 1;
  
      const toys = await Toy.find(query).sort({ [sortField]: sortOrder }).limit(20);
      res.json(toys);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  // Get a single toy by ID
  exports.getToyById = async (req, res) => {
    try {
      const id = req.params.id;
      const toy = await Toy.findById(id);
      if (!toy) {
        res.status(404).json({ error: 'Toy not found' });
      } else {
        res.json(toy);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  // Create a new toy
  export const createToy = async (req, res) => {
    try {
      const newToy = new Toy(req.body);
      const savedToy = await newToy.save();
      res.status(201).json(savedToy);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  // Update a toy by ID
  export const updateToyById = async (req, res) => {
    try {
      const id = req.params.id;
      const updatedToy = await Toy.findByIdAndUpdate(id, req.body, { new: true });
      if (!updatedToy) {
        res.status(404).json({ error: 'Toy not found' });
      } else {
        res.json(updatedToy);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  // Delete a toy by ID
  export const deleteToyById = async (req, res) => {
    try {
      const id = req.params.id;
      const deletedToy = await Toy.findByIdAndDelete(id);
      if (!deletedToy) {
        res.status(404).json({ error: 'Toy not found' });
      } else {
        res.json(deletedToy);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
