module.exports = {
	clearMocks: true,
	preset: 'ts-jest',
	collectCoverage: true,
	testEnvironment: 'node',
	coverageReporters: ['text-summary'],
	collectCoverageFrom: ['src/controllers/**'],
};
