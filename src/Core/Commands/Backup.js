function format(info) {
  return {
    embed: {
      color: 2645853,
      author: {
        name: "Shadow player",
        icon_url:
          "http://icons.iconarchive.com/icons/dtafalonso/yosemite-flat/512/Music-icon.png"
      },
      fields: [
        {
          name: "Info",
          value: info
        }
      ]
    }
  };
}
