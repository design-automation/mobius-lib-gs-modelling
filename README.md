# gs-modelling
A TypeScript modelling library using the gs-JSON format

Conventions
https://github.com/Microsoft/TypeScript/wiki/Coding-guidelines

# Classes
* Frame Class
* Vector Class
* Matrix Class

# Functions

## Create Functions
* vec.byXYZ
* matrix.byRows
* frame.byPoints, byAxes
* point.byXYZ
* acorn.byPoint
* pline.byPoints
* pgon.byPoints

## Generate Functions
* gen.extrude
* gen.revolve
* gen.loft
* gen.sweep

## Vector Functions
* vec.add
* vec.subtract
* vec.multiply
* vec.length
* vec.normalize
* vec.setLength

## Matrix Functions
* matrix.multiply
* matrix.invert

## Transform Functions
* xform.transform
* xform.move
* xform.reflect
* xform.rotate 
* xform.scale

## Measure Functions
* measure.distance
* measure.length
* measure.area
* measure.volume

## Analyse Functions
* analyse.centroid
* analyse.bbox
* analyse.normal

## Topology Functions
* topo.type
* topo.parent, children
* topo.getPoints, getVertices, getEdges, getWires, getFaces, getShells
* topo.getNumPoints, getNumVertices, getNumEdges, getNumWires, getNumFaces, getNumShells
* topo.copy

## Polyline Functions
* pline.dividByNum
* pline.dividByDist

## PolygonMesh Functions
* pgon.holes
* pgon.perimeter

## Attribute Functions
* attrib.set, get
* attrib.add, rem
* attrib.promote, demote

## Collection Functions
* coll.create, delete

## Property Functions
* prop.set, get
* prop.add, rem
