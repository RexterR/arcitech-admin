const Event = require("../model/Events");
const multer = require("../middlewares/multer");
const isUser = require("../middlewares/isUser");
const cloudinary = require("cloudinary").v2;
module.exports = function (app, passport) {
  app.get("/setEvent", isUser, (req, res) => {
    res.render("pages/setEvent");
  });
  app.post("/setEvent", multer.single("image"), async (req, res) => {
    try {
      const file = req.file;
      const event = new Event();
      event.topic = req.body.topic;
      event.details = req.body.details;
      event.eventLink = req.body.eventLink;
      event.date = req.body.date;
    
      const resp = await cloudinary.uploader.upload(file.path);
      event.image = resp.secure_url || "";
      await event.save();
      res.render("pages/setEvent", { success: true, message: "Event added" });
    } catch (error) {
      console.log(error);
      res.render("pages/setEvent", {
        success: false,
        message: "Event hasn't been added",
      });
    }
  });
  app.get("/getEvents", async (req, res) => {
    try {
      const events = await Event.find({});
      if (!events) throw Error("event Not found");
      res.status(200).json({ success: true, events });
    } catch (error) {
      res.status(400).json({ success: false, message: error.msg });
    }
  });
  app.get("/event", isUser, async (req, res) => {
    try {
      const events = await Event.find({});
      res.render("pages/events", { events });
    } catch (error) {
      res.render("pages/dashboard", {
        success: false,
        message: "Some error occured",
      });
    }
  });
};
