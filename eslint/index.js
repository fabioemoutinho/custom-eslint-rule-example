module.exports = {
  rules: {
    "my-awesome-rule": {
      meta: {},
      create: function (context) {
        return {};
      },
    },
    "no-testing": {
      meta: {
        messages: {
          noTesting: "Found '{{filename}}'. Sorry, no testing allowed.",
        },
      },
      create: function (context) {
        return {
          Program: function (node) {
            const filename = context.getFilename();
            if (filename.includes(".spec")) {
              context.report({
                node,
                messageId: "noTesting",
                data: {
                  filename,
                },
              });
            }
          },
        };
      },
    },
  },
};
