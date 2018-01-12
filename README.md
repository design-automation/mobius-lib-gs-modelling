[![Build Status](https://travis-ci.org/phtj/gs-json.svg?branch=master)]
# gs-modelling
A TypeScript modelling library using the gs-JSON format

See the API docs: https://phtj.github.io/gs-modelling

See the Github page: https://github.com/phtj/gs-modelling/

For more information about gs-json:
https://github.com/phtj/gs-json

## Ent
Entities contain geometric information. Entities consist of *Point* and *Obj*

### Point
Points are a type of entity that represent 3D points in space.

### Obj
Objects are a type of entity. Objects consist of *Ray*, *Plane*, *Conic*, *Polyline* and *Polymesh*

#### Ray
Rays are imaginary infinite axis defined by a vector.

#### Plane
Planes are imaginary infinite surfaces defined by 2 vectors.

#### Conic
Conic curves are mathematical curves. They consist of circles, ellipses, hyperbolas, parabolas and arcs.

#### Polyline
Polylines are straight line segments joined to form a continuous line

#### Polymesh
Polymeshes are flat polygons joined to form a continuous surface

