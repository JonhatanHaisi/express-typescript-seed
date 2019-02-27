import * as Chai from "chai";
import * as supertest from "supertest";

import { app } from "../src/app";
import { config } from "../src/config";
import db from "../src/infra/database";

const request = supertest;
const expect = Chai.expect;
const server = app.getApp();

export { server, request, expect, db, config };
