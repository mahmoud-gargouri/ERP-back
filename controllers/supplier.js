const Supplier = require("../models/supplier");

exports.getSupplier = (req, res, next) => {
  Supplier.find()
    .then((suppliers) => {
      console.log(suppliers);
      res.status(200).json({ suppliers: suppliers }); // Use societes directly without the .societes property
    })
    .catch((error) => {
      console.error("Error fetching societes:", error);
      res.status(500).json({ error: "Internal Server Error" });
    });
};
exports.getSupplierDetails = (req, res, next) => {
  const supplierID = req.params.supplierID;
  Supplier.findById(supplierID)
    .then((supplier) => {
      res.status(200).json({ supplier }); // Use societes directly without the .societes property
    })
    .catch((error) => {
      console.error("Error fetching societes:", error);
      res.status(500).json({ error: "Internal Server Error" });
    });
};

exports.postAddSupplier = async (req, res, next) => {
  try {
    // Your existing code...

    const {
      name,
      adress,
      iban,
      bank,
      swiftCodeBenif,
      benifBank,
      interBank,
      swiftCodeInterBank,
    } = req.body;

    if (
      !name ||
      !adress ||
      !bank ||
      !swiftCodeBenif ||
      !benifBank ||
      !interBank ||
      !swiftCodeInterBank
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const supplier = new Supplier({
      name: name,
      adress: adress,
      iban: iban,
      bank: bank,
      swiftCodeBenif: swiftCodeBenif,
      benifBank: benifBank,
      interBank: interBank,
      swiftCodeInterBank: swiftCodeInterBank,
    });

    const result = await supplier.save();
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
exports.updateSupplier = async (req, res, next) => {
  const supplierID = req.params.supplierID;
  const {
    name,
    adress,
    iban,
    bank,
    swiftCodeBenif,
    benifBank,
    interBank,
    swiftCodeInterBank,
  } = req.body;

  try {
    if (
      !name ||
      !adress ||
      !iban ||
      !bank ||
      !swiftCodeBenif ||
      !benifBank ||
      !interBank ||
      !swiftCodeBenif
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const updatedSupplier = await Supplier.findByIdAndUpdate(
      supplierID,
      {
        name,
        adress,
        iban,
        bank,
        swiftCodeBenif,
        benifBank,
        interBank,
        swiftCodeInterBank,
      },
      { new: true, runValidators: true }
    );

    if (!updatedSupplier) {
      return res.status(404).json({ error: "Societe not found" });
    }

    console.log("Supplier updated successfully");
    res.status(200).json({
      message: "Supplier updated successfully",
      supplier: updatedSupplier,
    });
  } catch (error) {
    console.error("Error updating supplier:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
