const Societe = require("../models/societe");

exports.getSociete = (req, res, next) => {
  Societe.find()
    .then((societes) => {
      console.log(societes);
      res.status(200).json({ societes: societes }); // Use societes directly without the .societes property
    })
    .catch((error) => {
      console.error("Error fetching societes:", error);
      res.status(500).json({ error: "Internal Server Error" });
    });
};
exports.getSocieteDetails = (req, res, next) => {
  const societeID = req.params.societeID;
  Societe.findById(societeID)
    .then((societe) => {
      console.log(societe);
      res.status(200).json({ societe }); // Use societes directly without the .societes property
    })
    .catch((error) => {
      console.error("Error fetching societes:", error);
      res.status(500).json({ error: "Internal Server Error" });
    });
};

exports.postAddSociete = async (req, res, next) => {
  try {
    // Your existing code...

    const { name, adress, passport, phone, iban } = req.body;

    if (!name || !adress || !passport || !phone || !iban) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const societe = new Societe({
      name: name,
      adress: adress,
      phone: phone,
      passport: passport,
      iban: iban,
    });

    const result = await societe.save();
    console.log("Societe added successfully");
    res
      .status(201)
      .json({ message: "Societe added successfully", societe: result });
  } catch (error) {
    console.error("Error adding societe:", error);
    // Ensure res is available in the catch block
    if (res) {
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      // Log the error if res is not available
      console.error("Error: res is undefined in catch block");
    }
  }
};
exports.updateSociete = async (req, res, next) => {
  const societeID = req.params.societeID;
  const { name, adress, passport, phone, iban } = req.body;

  try {
    if (!name || !adress || !passport || !phone || !iban) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const updatedSociete = await Societe.findByIdAndUpdate(
      societeID,
      { name, adress, passport, phone, iban },
      { new: true, runValidators: true }
    );

    if (!updatedSociete) {
      return res.status(404).json({ error: "Societe not found" });
    }

    console.log("Societe updated successfully");
    res
      .status(200)
      .json({
        message: "Societe updated successfully",
        societe: updatedSociete,
      });
  } catch (error) {
    console.error("Error updating societe:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
