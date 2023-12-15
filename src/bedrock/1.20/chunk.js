const { ChunkVersion } = require('../common/constants')
const ChunkColumn = require('../1.18/ChunkColumn')
const SubChunk120 = require('./SubChunk')

module.exports = (version) => {

  const registry = version.blockRegistry || version
  const Block = require('prismarine-block')(registry)
  const Biome = require('prismarine-biome')(registry)
  return class Chunk extends ChunkColumn {

    Section = SubChunk120

    constructor(options) {
      super(options, registry, Block, Biome)
      this.chunkVersion = this.chunkVersion || ChunkVersion.v1_18_0
      this.subChunkVersion = 9
    }

    static fromJson(str) {
      return new this(JSON.parse(str))
    }
  }
}
