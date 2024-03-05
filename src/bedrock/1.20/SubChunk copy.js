const SubChunk118 = require('../1.18/SubChunk')
const { StorageType } = require('../common/constants')
const PalettedStorage = require('../common/PalettedStorage')

class SubChunk120 extends SubChunk118 {

  loadPalettedBlocks2(storageLayer, stream, bitsPerBlock, format) {

    if ((format === StorageType.Runtime) && (bitsPerBlock === 0)) {
      this.palette[storageLayer] = []
      this.blocks[storageLayer] = new PalettedStorage(1)
      // const stateId = stream.readVarInt() >> 1
      // this.addToPalette(storageLayer, stateId)

      const block_runtime_id = stream.readVarInt() >> 1
      var stateId = this.registry.blockStatesByRuntimeId[block_runtime_id]


      if (!this.registry.blockStates[stateId]) {




        // console.log(this.registry.blocksByName.unknown.defaultState)
        console.log('addToPalette', block_runtime_id, stateId)

        //stateId = this.registry.blockStatesByRuntimeId[-2]
        //stateId = this.registry.blocksByName.unknown.defaultState
        // stateId = this.registry.blocksByName.bedrock.defaultState

      }
      
      this.addToPalette(storageLayer, stateId)

      return
    }
    return super.loadPalettedBlocks(...arguments)
  }


  loadPalettedBlocks(storageLayer, stream, bitsPerBlock, format) {

    //TODO: blockStatesByRuntimeId
    if ((format === StorageType.Runtime) && (bitsPerBlock === 0)) {

      console.log('WARNING - loadPalettedBlocks not implemented')
    }
    return super.loadPalettedBlocks(...arguments)
  }

  loadRuntimePalette(storageLayer, stream, paletteSize) {

    if (!this.registry.blockStatesByRuntimeId) {

      return super.loadRuntimePalette(...arguments)
    }

    this.palette[storageLayer] = []

    for (let i = 0; i < paletteSize; i++) {

      const block_runtime_id = stream.readZigZagVarInt()
      const stateId = this.registry.blockStatesByRuntimeId[block_runtime_id]
      const block = this.registry.blockStates[stateId] ?? this.registry.blockStates[this.registry.blockStatesByRuntimeId[-2]]
      this.palette[storageLayer][i] = { stateId, ...block, count: 0 }
    }
  }
}

module.exports = SubChunk120
