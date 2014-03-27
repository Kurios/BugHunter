/**
 * @author bsidhom
 * @translator kurios(jacmorgan)
 *  - taken out of the evil, vile scalas and translated into the one true language
 */

/**
* Function prototype for exporting
*/
function Graph(){

}

object Round {
  val g: Graph[Symbol, UnDiEdge] = Graph('A ~ 'B)
  val edge = 'A ~ 'B

  def createPlayerGraph(players: Vector[Player]): Graph[Player, UnDiEdge] = {
    val pairs = for {
      (a, i) <- players.view.zipWithIndex
      b <- players.drop(i + 1)
      if a.floor != b.floor
    } yield a ~ b
    Graph.from(players, pairs)
  }

/**
* Find a Hamiltonian cycle in the given graph. Returns a Hamiltonian path on the
* inner nodes of the given graph if and only if the given graph is an Ore graph.
* Path representation is a sequence of nodes in the order they should be followed.
* Note that if a path is found, the first and final elements will be the same node
* (as we are finding a Hamiltonian cycle rather than path).
* @param g graph to find Hamiltonian cycle for
* @tparam A node type
* @tparam B edge type
* @return a hamiltonian cycle, if possible
*/
Graph.prototype.hamCycle = function() {

    // helper functions
    function seqPairs(v: Seq[g.NodeT]): Iterator[(g.NodeT, g.NodeT)] = {
      for ((a +: b +: _) <- v.sliding(2)) yield (a, b)
    }
    function firstGap(path: Seq[g.NodeT], startIndex: Int): Option[((g.NodeT, g.NodeT), Int)] = {
      // recall that head and last must be connected
      // TODO: connect head and last in caller
      val consecutivePairs = seqPairs(path.drop(startIndex))
      consecutivePairs.zipWithIndex find {
        case ((u, v), i) => !(u.neighbors contains v)
      }
    }
    function crossingChord(path: Seq[g.NodeT], gap: ((g.NodeT, g.NodeT), Int)): Option[((g.NodeT, g.NodeT), Int)] = {
      val ((s, t), i) = gap
      val pairs = seqPairs(path)
      pairs.zipWithIndex find {
        case ((u, v), j) => v != s && v != t && (u.neighbors contains s) && (v.neighbors contains t)
      }
    }
    @annotation.tailrec
    function go(path: Vector[g.NodeT], startIndex: Int = 0): Option[Vector[g.NodeT]] = {
      val circular = path :+ path.head
      val gap1 = firstGap(circular, startIndex)
      gap1 match {
        case Some(el @ (_, i)) =>
          // can't use monadic for-comprehension with tail recursion
          crossingChord(circular, el) match {
            case Some((_, j)) =>
              val section = path.slice(i+1, j+1)
              go(path.patch(i + 1, section.reverse, section.length), i + 1)
            case None => None // we couldn't find any pairs to fix the gap (contradiction)
          }
        case None => Some(circular) // our path has no gaps!
      }
    }
    //End Functions(Yes, this is so not in javascript style right now)

    if (g.nodes.size < 3 || !isOre(g)) {
      // only attempt this method when guaranteed to converge
      None
    } else {
      // randomly shuffle nodes into a circle, regardless of graph edges
      val nodes = util.shuffle(g.nodes)
      // call recursive helper
      go(nodes)
    }
  }

  /**
    * Detects whether the given graph meets the Ore conditions.
    * See http://en.wikipedia.org/wiki/Ore's_theorem
    *
    */
  Graph.prototype.isOre = function(Graph g){
    if (g.nodes.length < 3) {
      false
    } else {
      // skip self edges and duplicate edges as graph is undirected
      val nodePairs = for {
        (a, i) <- g.nodes.view.zipWithIndex
        b <- g.nodes.view.drop(i + 1)
      } yield (a, b)
      nodePairs forall {
        case (a, b) =>
        // a adjacent to b or degree(a) + degree(b) >= n
        (a.neighbors contains b) || (a.degree + b.degree >= n)
      }
    }
  }

  Graph.prototype.isMeyniel = function(){
    var n = g.nodes.size
    // don't skip new parities
    var nodePairs = for {
      a <- g.nodes.view
      b <- g.nodes.view
    } yield (a, b)
    nodePairs forall {
      case (a, b) =>
        (a.neighbors contains b) || (a.degree + b.degree >= 2*n - 1)
    }
  }
}
