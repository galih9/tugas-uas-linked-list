import { Key, memo } from "react"
import React from "react"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import ExpandLessIcon from "@mui/icons-material/ExpandLess"
import DeleteIcon from "@mui/icons-material/Delete"
import AddIcon from "@mui/icons-material/Add"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"
import SEIcon from "@mui/icons-material/SouthEast"
import InputField from "../components/InputField"
import { IExampleTypes } from "./types"

interface ViewProps {
  list: IExampleTypes[]
  inputValue: IExampleTypes
  expanded: { [key: number]: boolean }
  childInput: IExampleTypes
  setChildInput: React.Dispatch<React.SetStateAction<IExampleTypes>>
  setExpanded: React.Dispatch<
    React.SetStateAction<{
      [key: number]: boolean
    }>
  >
  setInputValue: (value: IExampleTypes) => void
  handlePush: () => void
  handlePop: () => void
  handleDelete: (index: number) => void
  handleAddChild: (parentIndex: number, child: IExampleTypes) => void
  toggleExpand: (index: number) => void
  handleResetForm: () => void
  handleDeleteChild: (parentIndex: number, childIndex: number) => void
}

const View: React.FC<ViewProps> = ({
  list,
  inputValue,
  expanded,
  childInput,
  setChildInput,
  toggleExpand,
  setInputValue,
  handlePush,
  handlePop,
  handleDelete,
  handleAddChild,
  handleResetForm,
  handleDeleteChild,
}) => {
  return (
    <div className="p-4">
      <div className="flex gap-4 justify-between p-4">
        <h1 className="text-2xl font-bold mb-2">Lists</h1>
        <button
          onClick={handlePop}
          className="bg-red-500 text-white p-2 rounded-md"
        >
          Reset All Data
        </button>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 border rounded-md p-4 mb-4 shadow-lg bg-white">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 text-left">Name</th>
                <th className="py-2 text-left">Description</th>
                <th className="py-2 text-left">Grade</th>
                <th className="py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {list.map(
                (item: IExampleTypes, index: Key | null | undefined) => (
                  <React.Fragment key={index}>
                    <tr className="border-b">
                      <td className="py-2 text-left">{!expanded[index as number] ? <ChevronRightIcon /> : <SEIcon />} {item.name}</td>
                      <td className="py-2 text-left">{item.description}</td>
                      <td className="py-2 text-left">{item.grade}</td>
                      <td className="py-2 text-left">
                        <button
                          onClick={() => toggleExpand(index as number)}
                          className="bg-yellow-500 text-white p-2 mr-2 rounded-md"
                        >
                          {expanded[index as number] ? (
                            <ExpandLessIcon />
                          ) : (
                            <ExpandMoreIcon />
                          )}
                        </button>
                        <button
                          onClick={() => handleDelete(index as number)}
                          className="bg-red-500 text-white p-2 rounded-md"
                        >
                          <DeleteIcon />
                        </button>
                      </td>
                    </tr>
                    {expanded[index as number] && (
                      <>
                        {item.children &&
                          item.children.map((child, childIndex) => (
                            <tr
                              key={childIndex}
                              className="border-b bg-gray-100"
                            >
                              <td className="py-2 pl-8 text-left">
                                {child.name}
                              </td>
                              <td className="py-2 text-left">
                                {child.description}
                              </td>
                              <td className="py-2 text-left">{child.grade}</td>
                              <td className="py-2 text-left">
                                <button
                                  onClick={() =>
                                    handleDeleteChild(index as number, childIndex)
                                  }
                                  className="bg-red-500 text-white p-2 rounded-md"
                                >
                                  <DeleteIcon />
                                </button>
                              </td>
                            </tr>
                          ))}
                        <tr className="border-b bg-gray-100">
                          <td className="py-2 pl-8 text-right">
                            <InputField
                              type="text"
                              placeholder="Child Name"
                              value={childInput.name}
                              onChange={(e: { target: { value: any } }) =>
                                setChildInput({
                                  ...childInput,
                                  name: e.target.value,
                                })
                              }
                            />
                          </td>
                          <td className="py-2 text-right">
                            <InputField
                              type="text"
                              placeholder="Child Description"
                              value={childInput.description}
                              onChange={(e: { target: { value: any } }) =>
                                setChildInput({
                                  ...childInput,
                                  description: e.target.value,
                                })
                              }
                            />
                          </td>
                          <td className="py-2 text-right">
                            <InputField
                              type="number"
                              placeholder="Child Grade"
                              value={childInput.grade}
                              onChange={(e: { target: { value: any } }) =>
                                setChildInput({
                                  ...childInput,
                                  grade: Number(e.target.value),
                                })
                              }
                            />
                          </td>
                          <td className="py-2 text-left">
                            <button
                              onClick={() =>
                                handleAddChild(index as number, childInput)
                              }
                              className="bg-green-500 text-white p-2 rounded-md"
                            >
                              <AddIcon />
                            </button>
                          </td>
                        </tr>
                      </>
                    )}
                  </React.Fragment>
                ),
              )}
            </tbody>
          </table>
        </div>
        <div className="mb-4 flex flex-col items-start gap-4 border p-4 rounded-md shadow-lg bg-white">
          <h3 className=" text-lg font-bold">Input Form</h3>
          <InputField
            type="text"
            placeholder="Name"
            value={inputValue.name}
            onChange={(e: { target: { value: any } }) =>
              setInputValue({ ...inputValue, name: e.target.value })
            }
          />
          <InputField
            type="text"
            placeholder="Description"
            value={inputValue.description}
            onChange={(e: { target: { value: any } }) =>
              setInputValue({ ...inputValue, description: e.target.value })
            }
          />
          <InputField
            type="number"
            placeholder="Grade"
            value={inputValue.grade}
            onChange={(e: { target: { value: any } }) =>
              setInputValue({ ...inputValue, grade: Number(e.target.value) })
            }
          />
          <div>
            <button
              onClick={handlePush}
              className="bg-blue-500 text-white p-2 mr-2 rounded-md"
            >
              Add Data
            </button>
            <button
              onClick={handleResetForm}
              className="bg-red-500 text-white p-2 rounded-md"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(View)
