import { server } from "mock-server/env/nodejs";
import { resetMockDataStore } from "./mock-server/data-storage/mockDataStore";

jest.setTimeout(10000);

// Establish API mocking before all tests.
beforeAll(() => server.listen());

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers());

// Clean up after the tests are finished.
afterAll(() => server.close());

// Reset mock data storage
beforeAll(() => resetMockDataStore());
afterEach(() => resetMockDataStore());
