import { useStore } from "vuex";

export default class DatabaseManager {
    constructor(args) {
        // VueX
        this.store = useStore();

        // Database API
        this.server = args.server;
        this.port = args.port;

        // Initialize
        this.init();
    }

    init() {
        this.store.dispatch('console', { log: 'DatabaseManager: Initialized' });
    }
}