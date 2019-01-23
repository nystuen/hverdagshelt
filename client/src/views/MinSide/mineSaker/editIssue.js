// @flow

import React from "react";
import { Button } from "react-bootstrap";
import { Issue } from "../../../classTypes";
import { IssueService } from "../../../services";
import NavLink from "react-router-dom/es/NavLink";
import Nav from "react-bootstrap/es/Nav";
import NavItem from "react-bootstrap/es/NavItem";
import Progress from "reactstrap/es/Progress";
import { PageHeader } from "../../../components/PageHeader/PageHeader";
import { history } from "../../../index";

export class EditIssue extends React.Component<{
  match: { params: { issueId: number } }
}> {}
