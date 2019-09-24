module.exports = async function(cb, res) {
  try {
    await cb();
  } catch (error) {
    console.error(error);
    if (res) {
      res.send(error);
    }
  }
};
