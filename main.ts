namespace worldMap {
 export class TileMap {
     tileMap: tiles.TileMap
     protected currentLevel = 0
     blockedTypeofTile: Image

     constructor(tilesetObstacles: Image) {
         this.tileMap = new tiles.TileMap()
         this.blockedTypeofTile = tilesetObstacles
     }

    /**
     * sets the world map and progresses  and clears tiles until you progress up to the next level
     */
     setWorldMap(level: number) {
      if (this.levelEquals(level)) {
         this.currentLevel++

         for (const tile of tiles.getTilesByType(this.blockedTypeofTile)) {
           tiles.setWallAt(tile, false) 
         }
      }
     }

     /**
     * sets the tilemap and clears tiles and walls until you unlock to the next level and with a tile replaced the unlock with your new layer tile
     */
     setWorldMapWithReplacedTile(level: number, tile: Image) {
         this.setWorldMap(level)
        
         for (const tileLoc of tiles.getTilesByType(this.blockedTypeofTile)) {
             tiles.setTileAt(tileLoc, tile)
         }
     }

   /**
    * adds obstacles of the type of the tile image to the tilemap and clears until your progress gets upgraded
    */
     addObstacles(tile: Image) {
         for (const tilsetKindType of tiles.getTilesByType(tile)) {
           tiles.setWallAt(tilsetKindType, true)    
         }
     }

     /**
   * clears obstacles of the type of the tile image to the tilemap
    */
     removeObstacles(tile: Image) {
         for (const tilsetKindType of tiles.getTilesByType(tile)) {
             tiles.setWallAt(tilsetKindType, false)
         }
     }

     protected levelEquals(level: number): boolean {
         // if level is null or undefined, treat it as invalid
         if (level === null || level === undefined) return false
         return level === this.currentLevel
     }

     toString(): string {
         return `${this.tileMap}  ${this.currentLevel} ${this.blockedTypeofTile}`
     }
 }

  /**
   * sets the tilemap and clears tiles and walls until you unlock to the next level
   */
 export function setWorldMap(obstacles: Image, level = 0) {
     const worldMap = new TileMap(obstacles)
     worldMap.setWorldMap(level)
 }

    /**
     * sets the tilemap and clears tiles and walls until you unlock to the next level and with a tile replaced the unlock with your new layer tile
     */
    export function setWorldMapWithReplacedTile(obstacles: Image, level = 0) {
    const worldMap = new TileMap(obstacles)
    worldMap.setWorldMapWithReplacedTile(level, obstacles)
 }
} 
