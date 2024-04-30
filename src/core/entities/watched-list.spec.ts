import { Immutable, WatchedList } from './watched-list'

class ImmutableNumber implements Immutable {
  constructor(
    public value: number,
    public isImmutable: boolean = false,
  ) {}
}

class NumberWatchedList extends WatchedList<ImmutableNumber> {
  compareItems(a: ImmutableNumber, b: ImmutableNumber): boolean {
    return a.value === b.value
  }
}

describe('watched list', () => {
  test('if can create watched list with initial itens', () => {
    const item1 = new ImmutableNumber(1)
    const item2 = new ImmutableNumber(2)
    const item3 = new ImmutableNumber(3)
    const list = new NumberWatchedList([item1, item2, item3])

    expect(list.currentItems).toHaveLength(3)
  })
  test('if can add new itens to watched list', () => {
    const item1 = new ImmutableNumber(1)
    const item2 = new ImmutableNumber(2)
    const item3 = new ImmutableNumber(3)
    const list = new NumberWatchedList([item1, item2, item3])

    const item4 = new ImmutableNumber(4)
    list.add(item4)

    expect(list.currentItems).toHaveLength(4)
    expect(list.getNewItems()).toEqual([new ImmutableNumber(4)])
  })
  test('if can remove itens from watched list', () => {
    const item1 = new ImmutableNumber(1)
    const item2 = new ImmutableNumber(2)
    const item3 = new ImmutableNumber(3)
    const list = new NumberWatchedList([item1, item2, item3])

    list.remove(item2)

    expect(list.currentItems).toHaveLength(2)
    expect(list.getRemovedItems()).toEqual([new ImmutableNumber(2)])
  })
  test('if can add an item even if it was removed before from watched list', () => {
    const item1 = new ImmutableNumber(1)
    const item2 = new ImmutableNumber(2)
    const item3 = new ImmutableNumber(3)
    const list = new NumberWatchedList([item1, item2, item3])

    list.remove(item2)

    list.add(item2)

    expect(list.currentItems).toHaveLength(3)
    expect(list.getRemovedItems()).toEqual([])
    expect(list.getNewItems()).toEqual([])
  })
  test('if can remove an item even if it was added befor in watched list', () => {
    const item1 = new ImmutableNumber(1)
    const item2 = new ImmutableNumber(2)
    const item3 = new ImmutableNumber(3)
    const list = new NumberWatchedList([item1, item2, item3])

    const item4 = new ImmutableNumber(4)
    list.add(item4)
    list.remove(item4)

    expect(list.currentItems).toHaveLength(3)
    expect(list.getRemovedItems()).toEqual([])
    expect(list.getNewItems()).toEqual([])
  })
  test('if can update watched list', () => {
    const item1 = new ImmutableNumber(1)
    const item2 = new ImmutableNumber(2)
    const item3 = new ImmutableNumber(3)
    const list = new NumberWatchedList([item1, item2, item3])
    const item5 = new ImmutableNumber(5)
    list.update([item1, item3, item5])

    expect(list.currentItems).toHaveLength(3)
    expect(list.getRemovedItems()).toEqual([new ImmutableNumber(2)])
    expect(list.getNewItems()).toEqual([new ImmutableNumber(5)])
  })
  test('should prevent removal of immutable items', () => {
    const item1 = new ImmutableNumber(1)
    const item2 = new ImmutableNumber(2, true)
    const item3 = new ImmutableNumber(3)
    const list = new NumberWatchedList([item1, item2, item3])

    expect(() => list.remove(item2)).toThrow('Cannot remove an immutable item.')
    expect(list.currentItems).toHaveLength(3)
  })
  test('should update the watched list correctly, respecting immutability', () => {
    const item1 = new ImmutableNumber(1)
    const item2 = new ImmutableNumber(2, true)
    const item3 = new ImmutableNumber(3)
    const list = new NumberWatchedList([item1, item2, item3])

    const item5 = new ImmutableNumber(5)
    list.update([item1, item3, item5])

    expect(list.currentItems).toContainEqual(item1)
    expect(list.currentItems).toContainEqual(item2)
    expect(list.currentItems).toContainEqual(item3)
    expect(list.currentItems).toContainEqual(item5)
    expect(list.getRemovedItems()).toEqual([])
    expect(list.getNewItems()).toEqual([item5])
  })
})
