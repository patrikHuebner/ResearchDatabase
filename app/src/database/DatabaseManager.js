import { useStore } from "vuex";

export default class DatabaseManager {
    // CONSTRUCTOR ---------------------------------------------------------------------------------------------
    constructor(args) {
        // VueX
        this.store = useStore();

        // Database API
        this.server = args.server;
        this.port = args.port;

        // Initialize
        this.init();
    }

    // INIT ---------------------------------------------------------------------------------------------
    init() {
        this.store.dispatch('console', { log: 'DatabaseManager: Initialized' });
    }

    // GET ---------------------------------------------------------------------------------------------
    get(args) {
        // Check that we have the correct arguments to proceed
        if (args == undefined) {
            this.store.dispatch('error', { log: 'No arguments supplied for GET. Stopping attempt to GET.' })
            return;
        } else {
            if (args.route == undefined) {
                this.store.dispatch('error', { log: 'No ROUTE defined. Stopping attempt to GET.' })
                return;
            }
        }

        // Return a new promise to the API for GET
        return new Promise((resolve) => {
            this.store.dispatch('console', { log: 'Databse GET: ' + args.route });

            fetch(this.server + ":" + this.port + args.route, {
                mode: "cors",
            })
                .then((response) => response.json())
                .then((returnedData) => {
                    resolve(returnedData);
                })
                .catch((error) => {
                    this.store.dispatch('error', { log: error });
                    resolve(false);
                });
        });
    }
}