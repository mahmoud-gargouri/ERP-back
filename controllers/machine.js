const Machine = require("../models/machine");
exports.postAddMachine = (req, res, next) => {
  const { name } = req.body;

  const machine = new Machine({
    name: name,
  });
  machine.save();
  console.log("new machine : " + machine);
  res
    .status(201)
    .json({ message: "machine " + machine.name + " ajouter avec success" });
};

exports.getMachine = (req, res, next) => {
  Machine.find().then((resultat) => {
    res.status(200).json({ machine: resultat });
  });
};

exports.deleteMachine = (req, res, next) => {
  const machineID = req.params.machineID;
  Machine.findByIdAndDelete(machineID).then(() => {
    console.log("machine Deleted ");
    res.status(200).json({ message: "machine deleted " });
  });
};
