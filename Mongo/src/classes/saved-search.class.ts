import * as mongoose from 'mongoose'

export interface ISavedSearch extends mongoose.Document {
  email: string
  term: string
  timebox: number
  lastMailTimestamp: Date
}

const savedSearchSchema = new mongoose.Schema({
  email: {
    type: String
  },
  term: {
    type: String
  },
  timebox: {
    type: Number
  },
  lastMailTimestamp: {
    type: Date
  }
})

export const SavedSearch = mongoose.model<ISavedSearch>(
  'SavedSearch',
  savedSearchSchema
)
