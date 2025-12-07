const { Attachment } = require('../models');

exports.uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const { parent_id, parent_type } = req.body;

    if (!parent_id || !parent_type) {
        return res.status(400).json({ message: 'parent_id and parent_type are required' });
    }

    const attachment = await Attachment.create({
      file_name: req.file.filename,
      file_path: req.file.path,
      original_name: req.file.originalname,
      mime_type: req.file.mimetype,
      size: req.file.size,
      parent_id,
      parent_type,
      uploaded_by: req.user.id,
    });

    res.status(201).json(attachment);
  } catch (error) {
    res.status(500).json({ message: 'Error uploading file', error: error.message });
  }
};
