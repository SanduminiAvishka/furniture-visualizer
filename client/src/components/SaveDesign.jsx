import { useState, useEffect } from 'react'
import { useRoom } from '../context/RoomContext'

function SaveDesign() {
  const { currentDesign, saveDesign } = useRoom()
  const [designName, setDesignName] = useState('')
  const [saveStatus, setSaveStatus] = useState('')

  useEffect(() => {
    if (currentDesign) {
      setDesignName(currentDesign.name)
    }
  }, [currentDesign])

  const handleSave = () => {
    if (!designName.trim()) {
      setSaveStatus('Please enter a design name')
      return
    }
    
    const savedDesign = saveDesign(designName.trim())
    setSaveStatus(`Design ${currentDesign ? 'updated' : 'saved'} successfully!`)
    setTimeout(() => setSaveStatus(''), 3000)
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="font-semibold mb-3">
        {currentDesign ? 'Update Design' : 'Save New Design'}
      </h3>
      <div className="space-y-4">
        <div>
          <input
            type="text"
            value={designName}
            onChange={(e) => setDesignName(e.target.value)}
            placeholder="Enter design name"
            className="w-full rounded-md border-gray-300 shadow-sm"
          />
          {saveStatus && (
            <p className={`text-sm mt-1 ${saveStatus.includes('Please') ? 'text-red-500' : 'text-green-500'}`}>
              {saveStatus}
            </p>
          )}
        </div>
        <button
          onClick={handleSave}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
        >
          {currentDesign ? 'Update Design' : 'Save Design'}
        </button>
      </div>
    </div>
  )
}

export default SaveDesign 