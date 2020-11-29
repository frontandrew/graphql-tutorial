const graphql = require('graphql')
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
} = graphql

const Movies = require('../models/movie')
const Directors = require('../models/director')

const MovieType = new GraphQLObjectType({
  name: 'Movie',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    director: {
      type: DirectorType,
      resolve: (parent, args) => Directors.findById(parent.directorId),
    },
  }),
})

const DirectorType = new GraphQLObjectType({
  name: 'Director',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    movies: {
      type: new GraphQLList(MovieType),
      resolve: (parent, args) => Movies.find({ directorId: parent.id }),
    },
  }),
})

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    movie: {
      type: MovieType,
      args: { id: { type: GraphQLID } },
      resolve: (parent, args) => Movies.findById(args.id),
    },
    director: {
      type: DirectorType,
      args: { id: { type: GraphQLID } },
      resolve: (parent, args) => Directors.findById(args.id),
    },
    movies: {
      type: new GraphQLList(MovieType),
      // resolve: () => Movies.find({}),
      resolve() {
        console.log('movies sceme', { ...Movies })
        return Movies.find({})
      }
    },
    directors: {
      type: new GraphQLList(DirectorType),
      resolve: () => Directors.find({}),
    },
  },
})

module.exports = new GraphQLSchema({
  query: Query,
})