const Event = require("../models/event");

exports.getEventDate = (req, res, next) => {
  const { start, end } = req.query;

  const startDate = new Date(start);
  const endDate = new Date(end);

  Event.find({
    $or: [
      { date_debut: { $gte: startDate, $lte: endDate } },
      { date_fin: { $gte: startDate, $lte: endDate } },
      {
        $and: [
          { date_debut: { $lte: startDate } },
          { date_fin: { $gte: endDate } },
        ],
      },
    ],
  })
    .then((events) => {
      console.log("Événements trouvés :", events);
      res.json({ events: events });
    })
    .catch((err) => console.error(err));
};

exports.updateEvent = async (req, res, next) => {
  const eventId = req.params.eventID;
  const { name, date_debut, date_fin, machine, color } = req.body;

  try {
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Événement non trouvé." });
    }

    event.name = name;
    event.date_debut = date_debut;
    event.date_fin = date_fin;
    event.machine = machine;
    event.color = color;

    const updatedEvent = await event.save();
    res.status(200).json({
      message: "Événement mis à jour avec succès.",
      event: updatedEvent,
    });
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'événement:", error);
    res
      .status(500)
      .json({ message: "Erreur lors de la mise à jour de l'événement." });
  }
};

exports.postAddEvent = async (req, res, next) => {
  const { name, date_debut, date_fin, machine, color, product } = req.body;

  try {
    const newEvent = new Event({
      name,
      date_debut: new Date(date_debut),
      date_fin: new Date(date_fin),
      machine,
      color,
      product,
    });

    const savedEvent = await newEvent.save();
    res.status(201).json({
      message: "Événement ajouté avec succès.",
      event: savedEvent,
    });
  } catch (error) {
    console.error("Erreur lors de l'ajout de l'événement:", error);
    res.status(500).json({ message: "Erreur lors de l'ajout de l'événement." });
  }
};

exports.getEventDetails = (req, res, next) => {
  const eventID = req.params.eventID;

  Event.findById(eventID)
    .populate("product") // Populate the product details
    .then((event) => {
      if (!event) {
        return res.status(404).json({ message: "Event not found." });
      }
      res.status(200).json({ event });
    })
    .catch((error) => {
      console.error("Error fetching event details:", error);
      res.status(500).json({ message: "Error fetching event details." });
    });
};

exports.deleteEvent = (req, res, next) => {
  const eventID = req.params.eventID;
  Event.findByIdAndDelete(eventID).then(() => {
    console.log("event Deleted ");
    res.status(200).json({ message: "event deleted " });
  });
};
exports.getProductByEventName = async (req, res, next) => {
  const { eventName } = req.params;

  try {
    // Find the event by name and populate the product details
    const event = await Event.findOne({ name: eventName }).populate("product");

    if (!event) {
      return res.status(404).json({ message: "Event not found." });
    }

    // Return the product details associated with the event
    res.status(200).json({ product: event.product });
  } catch (error) {
    console.error("Error fetching product details:", error);
    res.status(500).json({ message: "Error fetching product details." });
  }
};

exports.addStock = async (req, res) => {
  console.log("Request Params:", req.params);
  console.log("Request Body:", req.body);

  try {
    const { stock } = req.body;
    const { eventID } = req.params;

    if (!eventID || stock === undefined) {
      return res
        .status(400)
        .json({ error: "Event ID and stock value are required" });
    }

    // Find the event by ID and update its stock
    const event = await Event.findByIdAndUpdate(
      eventID,
      { stock },
      { new: true, runValidators: true }
    );

    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    res.status(200).json({ message: "Stock updated successfully", event });
  } catch (error) {
    console.error("Error updating stock:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
