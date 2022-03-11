module.exports = {
  modifyRes: function (res, status, message, data) {
    res.json({
      status: status,
      message: message,
      data: data,
    });
  },

  sendErrorServer: function (res) {
    res.status(500).send();
  },
};
