const hasHostListenerKeyEvent = function (members) {
  const keyEvents = { keydown: 1, keypress: 1, keyup: 1 };

  for (let i = 0; i < members.length; i++) {
    const member = members[i];
    if (member.type === "MethodDefinition" && member.kind === "method") {
      const decorators = member.decorators;
      for (let j = 0; j < decorators?.length; j++) {
        const decorator = decorators[j];
        const [event] = decorator.expression.arguments ?? [];
        if (
          decorator.expression.callee.name === "HostListener" &&
          keyEvents.hasOwnProperty(event?.value)
        ) {
          return true;
        }
      }
    }
  }
  return false;
};

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
    "host-listener-click-events-have-key-events": {
      meta: {
        messages: {
          hostListenerClickEventsHaveKeyEvents:
            "HostListener click must be accompanied by either keyup, keydown or keypress event for accessibility.",
        },
      },
      create: function (context) {
        return {
          Decorator: function (node) {
            const expression = node.expression;
            const isHostListener = expression.callee?.name === "HostListener";

            if (!isHostListener) {
              return;
            }

            const [event] = expression.arguments ?? [];
            const isClickEvent = event?.value === "click";
            if (!isClickEvent) {
              return;
            }

            const hostClass = node.parent.parent;
            if (!hasHostListenerKeyEvent(hostClass.body)) {
              context.report({
                node: node,
                messageId: "hostListenerClickEventsHaveKeyEvents",
              });
            }
          },
        };
      },
    },
  },
};
