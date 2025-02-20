import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { pushData, popData, deleteData, addChild, deleteChild } from "./slice"
import { RootState } from "../app/store"
import View from "./view"
import { IExampleTypes } from "./types"

const initialFormValue = {
  name: "",
  description: "",
  grade: 0,
}

const HomePage = () => {
  const dispatch = useDispatch()
  const list = useSelector((state: RootState) => state.gameSlice.data)
  const [inputValue, setInputValue] = useState<IExampleTypes>(initialFormValue)
  const [expanded, setExpanded] = useState<{ [key: number]: boolean }>({})
  const [childInput, setChildInput] = useState<IExampleTypes>(initialFormValue)

  const toggleExpand = (index: number) => {
    setExpanded(prev => ({ ...prev, [index]: !prev[index] }))
  }

  const handlePush = () => {
    if (inputValue.name && inputValue.description) {
      dispatch(pushData(inputValue))
      setInputValue({ name: "", description: "", grade: 0 })
    }
  }

  const handlePop = () => {
    dispatch(popData())
  }

  const handleDelete = (index: number) => {
    dispatch(deleteData(index))
  }

  const handleAddChild = (parentIndex: number, child: IExampleTypes) => {
    dispatch(addChild({ parentIndex, child }))
    setChildInput(initialFormValue)
  }

  const handleDeleteChild = (parentIndex: number, childIndex: number) => {
    dispatch(deleteChild({ parentIndex, childIndex }))
  }

  return (
    <View
      expanded={expanded}
      list={list}
      inputValue={inputValue}
      childInput={childInput}
      setChildInput={setChildInput}
      setInputValue={setInputValue}
      handlePush={handlePush}
      handlePop={handlePop}
      handleDelete={handleDelete}
      handleAddChild={handleAddChild}
      setExpanded={setExpanded}
      handleResetForm={() => {
        setInputValue(initialFormValue)
      }}
      toggleExpand={toggleExpand}
      handleDeleteChild={handleDeleteChild}
    />
  )
}

export default HomePage
