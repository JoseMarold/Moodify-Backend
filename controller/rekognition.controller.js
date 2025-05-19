const Sentry = require('@sentry/node');
// controller/rekognition.controller.js
const {
    RekognitionClient,
    DetectFacesCommand
  } = require("@aws-sdk/client-rekognition");
  
  const client = new RekognitionClient({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID?.trim(),
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY?.trim()
    }
  });
  
  const getAnalysis = async (req, res) => {
    try {
      const { content } = req.body;
      if (!content) return res.status(400).json({ message: 'Image missing' });
  
      const base64Image = content.split(';base64,').pop();
      const imageBuffer = Buffer.from(base64Image, 'base64');
  
      const command = new DetectFacesCommand({
        Image: { Bytes: imageBuffer },
        Attributes: ['ALL']
      });
  
      const response = await client.send(command);
  
      if (response.FaceDetails.length > 0) {
        const emotion = response.FaceDetails[0].Emotions[0];
        res.status(200).json({
          emotion: emotion.Type,
          confidence: emotion.Confidence
        });
      } else {
        res.status(400).json({ message: 'Nothing clear' });
      }
    } catch (error) {
      console.error("Error:Rekognition error", error);
      Sentry.captureException(error);
      res.status(500).json({ message: "Internal rekognition error", error });
    }
  };
  
  module.exports = { getAnalysis };
  