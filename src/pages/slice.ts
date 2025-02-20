import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IInitialProps, IExampleTypes } from "./types"

const initialState: IInitialProps = {
  data: [],
}

const gameSlice = createSlice({
  name: "gameSlice",
  initialState,
  reducers: {
    pushData: (state, action: PayloadAction<IExampleTypes>) => {
      state.data.push(action.payload)
    },
    popData: (state) => {
      state.data.pop()
    },
    populateData: (state, { payload }) => {
      state.data = payload
    },
    deleteData: (state, action: PayloadAction<number>) => {
      state.data = state.data.filter((_, index) => index !== action.payload)
    },
    addChild: (state, action: PayloadAction<{ parentIndex: number, child: IExampleTypes }>) => {
      const { parentIndex, child } = action.payload
      const parent = state.data[parentIndex]
      if (parent) {
        if (!parent.children) {
          parent.children = []
        }
        parent.children.push(child)
      }
    },
    deleteChild: (state, action: PayloadAction<{ parentIndex: number, childIndex: number }>) => {
      const { parentIndex, childIndex } = action.payload
      const parent = state.data[parentIndex]
      if (parent && parent.children) {
        parent.children = parent.children.filter((_, index) => index !== childIndex)
      }
    },
  },
})

export const { pushData, popData, populateData, deleteData, addChild, deleteChild } = gameSlice.actions
export default gameSlice
