module.exports = {
  attributes: {
    // e.g., "Polly"
    title: {
      type: 'STRING'
    },

    description: {
      type: 'TEXT'
    },

    link: {
      type: 'STRING'
    },

    publication_date: {
      type: 'DATE'
    },

    source: {
      type: 'INT'
    },

    // news: {
    //   collection: 'news',
    //   via: 'source'
    // }
  }
}