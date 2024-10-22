const explorer = {
  id: "1",
  name: "root",
  isFolder: true,
  item: [
    {
      id: "2",
      name: "Public",
      isFolder: true,
      item: [
        {
          id: "3",
          name: "Public Nested 1",
          isFolder: true,
          item: [
            {
              id: "4",
              name: "index.html",
              isFolder: false,
            },
            {
              id: "5",
              name: "index.css",
              isFolder: false,
            },
          ],
        },
      ],
    },
    {
      id: "6",
      name: "src",
      isFolder: true,
      item: [
        {
          id: "7",
          name: "src nested 1",
          isFolder: true,
          item: [
            {
              id: "8",
              name: "index.js",
              isFolder: false,
            },
            {
              id: "9",
              name: "index.css",
              isFolder: false,
            },
          ],
        },
      ],
    },
  ],
};

export default explorer;
