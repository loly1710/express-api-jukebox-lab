const Track = require('../models/track.js')
const express = require('express')
const router = express.Router()

// CREATE - POST 
router.post('/', async (req, res) => {
  try {
    const createdTrack = await Track.create(req.body)
    res.status(201).json(createdTrack)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// READ ALL Tracks - GET 
router.get('/', async (req, res) => {
  try {
    const foundTracks = await Track.find()
    res.status(200).json(foundTracks)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// READ ONE PET - GET - /tracks/:tracksId
router.get('/:tracksId', async (req, res) => {
  try {
    const foundTrack = await Track.findById(req.params.tracksId)
    if (!foundTrack) {
      res.status(404)
      throw new Error('Track not found.')
    }
    res.status(200).json(foundTrack)
  } catch (error) {
    if (res.statusCode === 404) {
      res.json({ error: error.message })
    }
    res.status(500).json({ error: error.message })
  }
})

// DELETE - DELETE - /tracks/:tracksId
router.delete('/:tracksId', async (req, res) => {
  try {
    const deletedTrack = await Track.findByIdAndDelete(req.params.tracksId)
    if (!deletedTrack) {
      res.status(404)
      throw new Error('Track not found.')
    }
    res.status(200).json(deletedTrack)
  } catch (error) {
    if (res.statusCode === 404) {
      res.json({ error: error.message })
    }
    res.status(500).json({ error: error.message })
  }
})

// UPDATE - PUT - /tracks/:tracksId
router.put('/:tracksId', async (req, res) => {
  try {
    const updatedTrack = await Track.findByIdAndUpdate(req.params.tracksId, req.body, {
        new: true
    })
    if (!updatedTrack) {
        res.status(404)
        throw new Error('Track not found')
    }
    res.status(200).json(updatedTrack)
  } catch (error) {
    if (res.statusCode === 404) {
        res.json({ error: error.message })
    }
    res.status(500).json({ error: error.message })
  }
})

module.exports = router