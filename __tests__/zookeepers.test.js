const fs = require("fs");
const { filterByQuery, findById, createNewZookeeper, validateZookeeper } = require("../lib/zookeepers");
const { zookeepers } = require("../data/zookeepers");
jest.mock("fs");

test("creates a zookeeper object", () => {
    const zookeeper = createNewZookeeper({name: "bla", id: "123"}, zookeepers);

    expect(zookeeper.name).toBe("bla");
    expect(zookeeper.id).toBe("123");
});

test("filters by query", () => {
    const query = {age: 20};
    const filteredResults = filterByQuery(query, zookeepers);

    expect(filteredResults.length).toEqual(1);
});

test("finds by id", () => {
    const zookeeper = findById("1", zookeepers);

    expect(zookeeper.name).toBe("Raksha");
});

test("validate zookeeper", () => {
    const validZookeeper = {
        "id": "1",
        "name": "Raksha",
        "age": 31,
        "favoriteAnimal": "penguin"
    };
    const invalidZookeeper = {
        "id": "",
        "name": "Raksha",
        "age": "31",
        "favoriteAnimal": 55
    };

    const zookeeper = validateZookeeper(validZookeeper);
    const zookeeperTwo = validateZookeeper(invalidZookeeper);

    expect(zookeeper).toBe(true);
    expect(zookeeperTwo).toBe(false);
});