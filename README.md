# gs-modelling
A TypeScript modelling library using the gs-JSON format

Conventions
https://github.com/Microsoft/TypeScript/wiki/Coding-guidelines

# Classes

* Entity Class
  * setAttr, getAttr, delAttr
  * Subclasses
    * Point Class
      * getPosition
    * Vertex Class
      * getPoint
      * Subclasses
        * Acorn Class
    * Edge Class
    * Wire Class
      * getPoints, getVertices, getEdges
      * getNumPoints, getNumVertices, getNumEdges
      * Subclasses
        * Polyline Class
    * Face Class
    * Shell Class
      * getPoints, getVertices, getEdges, getWires, getFaces
      * getNumPoints, getNumVertices, getNumEdges, getNumWires, getNumFaces
      * Subclasses
        * PolygonMesh Class

* Collection Class
  * addEntity, remEntity
  * addProperty, delProperty
  
* Frame Class
  * byPoints, byAxes
* Vector Class
  * byXYZ
  * add, subtract, multiply, length, normalize, setLength
* Matrix Class

# Functions

## Point

### Creation
* byXYZ

## Acorn Functions

### Creation
* byPoint

## Polyline Functions 

### Creation
* byPoints

### Modification
* offset
* divide

## Polygon Meshe Functions
* byPoints

### Modification
* offset 
* divide

## Transform Functions
* transform
* move
* reflect
* rotate 
* scale

## Generate Functions
* extrude
* revolve
* loft
* sweep

## Measure Functions
* distance
* length
* area
* volumes

## Analyze Functions
* centroid
* bbox

