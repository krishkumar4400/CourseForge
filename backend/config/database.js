import mongoose from "mongoose";

const MAX_RETRIES = 3;
const RETRY_INTERVAL = 5000; // 5 seconds

class DatabaseConnection {
  constructor() {
    this.retryCount = 0;
    this.isConnected = false;

    // configure mongoose settings
    mongoose.set("strictQuery", true);

    mongoose.connection.on("connected", () => {
      console.log("MONGODB CONNECTED SUCCESSFULLY");
      this.isConnected = true;
    });

    mongoose.connection.on("disconnected", async () => {
      console.log("MONGODB IS DISCONNECTED");
      this.isConnected = false;
      // TODO: attempt a reconnection
      await this.handleDisconnection();
    });

    mongoose.connection.on("error", (errror) => {
      console.log("MONGODB CONNECTION ERROR", error);
      this.isConnected = false;
    });

    process.on("SIGTERM", this.handleAppTermination.bind(this));
    process.on("SIGINT", this.handleAppTermination.bind(this));
  }

  async connect() {
    try {
      if (!process.env.MONGO_URI) {
        throw new Error("MONDO DB URI is not defined in env variables");
      }

      const connectionOptions = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        minPoolSize: 10,
        maxPoolSize: 100,
        socketTimeoutMS: 45000,
        serverSelectionTimeoutMS: 5000,
        family: 4, // use IPv4
      };

      if (process.env.NODE_ENV === "development") {
        mongoose.set("debug", true);
      }

      await mongoose.connect(process.env.MONGO_URI, connectionOptions);
      this.retryCount = 0; // reset retry count on success
    } catch (error) {
      console.error(error);
      await this.handleConnectionError();
    }
  }

  async handleConnectionError() {
    if (this.retryCount < MAX_RETRIES) {
      this.retryCount++;
      console.log(
        `Rtrying connection... Attempt ${this.retryCount} of ${MAX_RETRIES}`,
      );
      await new Promise((resolve) => {
        setTimeout(() => resolve(), RETRY_INTERVAL);
      });

      return this.connect();
    } else {
      console.error(
        `Failed to connect to MONGODB after ${MAX_RETRIES} attempts`,
      );
      process.exit(1);
    }
  }

  /** handle disconnection - try reconnection
   * - causes
   * pool might closed
   * might be some errors
   * might be some database side network error
   *
   */

  async handleDisconnection() {
    if (!this.isConnected) {
      console.log("Attempting to reconnect to mongodb...");
      this.connect();
    }
  }

  async handleAppTermination() {
    try {
      await mongoose.connection.close();
      console.log("MongoDB connection closed through app termination");
      process.exit(0);
    } catch (error) {
      process.exit(1);
      console.error("Error during database disconnection ", error);
    }
  }

  getConnectionStatus() {
    return {
      isConnected: this.isConnected,
      readyState: mongoose.connection.readyState,
      host: mongoose.connection.host,
      name: mongoose.connection.name,
    };
  }
}

// create a singleton instance
const dbConnection = new DatabaseConnection();

export default dbConnection.connect.bind(dbConnection);
export const getDBStatus = dbConnection.getConnectionStatus.bind(dbConnection);
