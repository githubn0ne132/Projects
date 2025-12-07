# ProjectFlow: Collaborative Project & Task Management

**ProjectFlow** is a robust, multi-user web application designed to streamline project management and task delegation. It features role-based access control, real-time progress tracking, file attachments, and an automated notification system to keep teams aligned.

[Image of project management dashboard UI wireframe]


## 🌟 Key Features

### 1. Project & Task Management
* **Projects:**
    * Create, edit, and archive projects.
    * **Detailed Descriptions:** Support for rich text descriptions to clearly define project scope, goals, and deliverables.
    * Visual progress bars calculate advancement based on completed child tasks.
* **Tasks:**
    * Granular task creation within projects.
    * **Task Descriptions:** Comprehensive descriptions to provide context, instructions, and acceptance criteria.
    * Deadlines and Priority Levels (Low, Medium, High).
* **Advancement Tracking:**
    * **Manual:** Users can update the completion percentage (0-100%) of specific tasks.
    * **Status Workflow:** Tasks move through states (e.g., *To Do -> In Progress -> Review -> Done*).

### 2. Multi-User & Multi-Role (RBAC)
Secure authentication and authorization system with distinct roles:
* **Admin:** Full system access, user management, and configuration.
* **Manager:** Can create projects, assign tasks, and view all reports.
* **Contributor:** Can view assigned projects, update task status, and upload files.
* **Viewer:** Read-only access to specific projects.

### 3. Global Search 🔍
* **Instant Retrieval:** A powerful global search bar located in the header.
* **Scope:** Index and search across **Project Titles**, **Task Descriptions**, and **File Names**.
* **Filtering:** Filter search results by status, assignee, or date range to find specific items instantly.

### 4. Assignment & Notifications
* **Smart Assignment:** Managers can assign one or multiple users to specific tasks.
* **Notification Engine:** Users receive alerts (Email + In-App) when:
    * They are assigned to a new task.
    * A task they are following is updated (description change, status change, comment added).
    * A deadline is approaching.

### 5. File Attachment System
* **Uploads:** Drag-and-drop support for documents and images.
* **Context:** Attach files directly to a **Project** (spec sheets, contracts) or a **Task** (mockups, reports).

---

## 🛠 Tech Stack

The architecture is built on the **PERN** stack (PostgreSQL, Express, React, Node.js) for reliability and scalability.

* **Frontend:**
    * **React.js:** Dynamic user interface and state management.
    * **Redux Toolkit:** For global state management (User auth, notifications).
    * **Tailwind CSS:** For responsive and modern styling.
* **Backend:**
    * **Node.js & Express:** RESTful API architecture.
    * **Socket.io:** Real-time event handling for notifications and updates.
* **Database:**
    * **PostgreSQL:** Relational database for structured data integrity.
    * **Sequelize ORM:** For schema management and database interactions.
    * 

[Image of entity relationship diagram for project management app]

* **File Storage:**
    * **AWS S3:** Scalable cloud storage for user uploads.
* **Search:**
    * **PostgreSQL Full-Text Search:** Native, high-performance indexing for the Global Search feature.

---

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites

* [Node.js](https://nodejs.org/) (v18 or higher)
* [PostgreSQL](https://www.postgresql.org/) running locally or via Docker
* [npm](https://www.npmjs.com/)

### Installation

1.  **Clone the repository**
    ```bash
    git clone [https://github.com/your-username/projectflow.git](https://github.com/your-username/projectflow.git)
    cd projectflow
    ```

2.  **Install Dependencies**
    ```bash
    # Install server dependencies
    cd server
    npm install

    # Install client dependencies
    cd ../client
    npm install
    ```

3.  **Environment Configuration**
    Create a `.env` file in the root (or server) directory based on the example:
    ```bash
    cp .env.example .env
    ```
    *Update the `.env` file with your specific credentials (DB URL, JWT Secret, AWS Keys).*

4.  **Database Migration**
    Run the migration script to set up the schema.
    ```bash
    # Using Sequelize CLI
    npx sequelize-cli db:migrate
    ```

5.  **Run the Application**
    ```bash
    # Run Backend
    npm run start:server

    # Run Frontend (in a new terminal)
    npm run start:client
    ```

The app should now be running at `http://localhost:3000`.

---

## ⚙️ Configuration (.env variables)

Ensure the following variables are set for the app to function correctly:

| Variable | Description |
| :--- | :--- |
| `PORT` | The port the server runs on (default: 5000) |
| `DATABASE_URL` | PostgreSQL Connection string |
| `JWT_SECRET` | Secret key for signing auth tokens |
| `SMTP_HOST` | Host for sending email notifications |
| `SMTP_USER` | Email service username |
| `AWS_ACCESS_KEY`| AWS Access Key ID for S3 |
| `AWS_SECRET_KEY`| AWS Secret Access Key for S3 |
| `AWS_BUCKET` | Bucket name for file uploads |

---

## 📖 Usage Guide

### For Managers
1.  Log in and navigate to **"New Project"**.
2.  Fill in the project **Title** and **Description**, then save.
3.  Click into the project and select **"Add Task"**.
4.  Enter the task **Description** (instructions), deadline, and select a user from the **"Assignee"** dropdown.
5.  Attach any relevant files.
6.  The assignee will receive a notification immediately.

### For Contributors
1.  Check your **Dashboard** for assigned tasks.
2.  Click a task to view the **Description** and instructions.
3.  Use the **Search Bar** to quickly locate older tasks or documentation.
4.  As you work, update the **Progress Bar** or move the **Status** to "In Progress".
5.  Upload result files directly to the task card.

---

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

### 📬 Contact

Project Link: https://github.com/githubn0ne132/Projects
