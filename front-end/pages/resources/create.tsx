import Head from "next/head";
import ResourcesOverviewTable from "../../components/resources/ResourcesOverviewTable";
import { useState, useEffect } from "react";
import { Resource } from "../../types";
import { Subject } from "../../../back-end/domain/model/subject";
import Header from "@/components/header";
import ResourceService from "../../services/ResourceService";
import React from "react";

const Resources: React.FC = () => {
  const [subject, setSubject] = useState("Select option...");
  const createResource = () => {};

  return (
    <>
      <Head>
        <title>Resources</title>
      </Head>
      <Header />
      <main>
        <h1>Resources</h1>
        <section>
          <form>
            <label htmlFor="title">Title: </label>
            <input type="text" id="title" />
            <label htmlFor="description">Description: </label>
            <textarea id="description" cols={30} rows={5}></textarea>
            <label>Category</label>
            <div className="radio-option">
              <input
                type="radio"
                id="summary"
                name="category"
                value={"Summary"}
              />
              <label htmlFor="summary">Summary</label>
            </div>

            <div className="radio-option">
              <input
                type="radio"
                id="cheat-sheet"
                name="category"
                value={"Cheat Sheet"}
              />
              <label htmlFor="cheat-sheet">Cheat Sheet</label>
            </div>

            <div className="radio-option">
              <input
                type="radio"
                id="lecture-notes"
                name="category"
                value={"Lecture Notes"}
              />
              <label htmlFor="lecture-notes">Lecture Notes</label>
            </div>
            <label htmlFor="subject">Subject</label>

          </form>
        </section>
      </main>
    </>
  );
};

export default Resources;
