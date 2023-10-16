<div align="center">

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url] [![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

</div>

<!-- Project logo. -->
<br />
<div align="center">
  <h1 align="center">SFU API Wrapper</h1>

  <p align="center">
    An asynchronous TypeScript wrapper for SFU's API.
    <br />
    <a href="#documentation"><strong>README docs</strong></a>
    ·
    <a href="https://ewanbrinkman.github.io/sfuapi/"><strong>TypeDoc docs</strong></a>
    <br />
    <br />
    <a href="https://github.com/ewanbrinkman/sfuapi/issues">Report Bug</a>
    ·
    <a href="https://github.com/ewanbrinkman/sfuapi/issues">Request Feature</a>
  </p>
</div>

<!-- Table of contents. -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#documentation">Documentation</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<!-- About the project. -->

## About The Project

This project was made since there is no developed wrapper that I know of for
SFU's API. The goal is to not simply return the JSON data from the API, but
custom classes with useful methods.

<!-- Getting started. -->

## Getting Started

How to set up locally. This package is not currently published to npm.

### Prerequisites

-   npm
    ```sh
    npm install npm@latest -g
    ```

### Installation

1. Clone the repo
    ```sh
    git clone https://github.com/ewanbrinkman/sfuapi.git
    ```
2. Install NPM packages
    ```sh
    npm install
    ```
3. Build.
    ```sh
    npm run build
    ```
4. Go to the directory of your own project. Then, install `sfuapi` in your own
   project.
    ```sh
    npm install /path/to/local/sfuapi/installed/package
    ```

<!-- Usage. -->

## Usage

### Full Basic Example

```typescript
import sfuapi, { CourseOffering } from 'sfuapi';

(async () => {
    const courseOffering: CourseOffering = await sfuapi.courseOffering(
        'cmpt',
        '105w',
        'd100',
        2022,
        'fall',
    );
    console.log(courseOffering);
})();
```

### Wrapper Functions

To use these functions, first import `sfuapi`:

```typescript
import sfuapi from 'sfuapi';
```

For type hinting, the return values can also be imported alongside `sfuapi`:

```typescript
import sfuapi, { Course } from 'sfuapi';
```

#### Get a course

```typescript
const course: Course = await sfuapi.course('cmpt', '120', 2021, 'fall');
```

#### Get a course offering

```typescript
const courseOffering: CourseOffering = await sfuapi.courseOffering(
    'cmpt',
    '120',
    'd100',
    2021,
    'fall',
);
```

### Wrapper Classes

For the examples, assume an instance of `Course` called `course` has been
created.

#### Check if a course has a given section

```typescript
const hasSection: boolean = await course.hasSection('d100');
```

## Documentation

For further documention, see the [TypeDoc documentation](https://ewanbrinkman.github.io/sfuapi/).

### Wrapper Functions

<table>
<thead>
<tr>
<th>Function</th>
<th>Description</th>
<th>Parameters</th>
<th>Return Value</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`course`

</td>
<td>

Get data about a course, independent of course section. If more information such
as the course instructors and schedule is wanted, use `getSection` on the return
value of type `Course`. Alternatively, simply use the `courseOffering` wrapper
function.

</td>
<td>

department: `string`<br> number: `string`<br> year:
`CourseOutlinesYear = 'current'`<br> term: `CourseOutlinesTerm = 'current'`

</td>
<td>

Promise<[Course](#course)>

</td>
</tr>
<tr>
<td>

`courseOffering`

</td>
<td>
Get data about a specific course section. Since it is a course section, more information is included, such as the course instructors and schedule.
</td>
<td>

department: `string`<br> number: `string`<br> section: `string`<br> year:
`CourseOutlinesYear = 'current'`<br> term: `CourseOutlinesTerm = 'current'`

</td>
<td>

Promise<[CourseOffering](#course-offering)>

</td>
</tr>
</tbody>
</table>

### Wrapper Classes

#### Course

<table>
<thead>
<tr>
<th>Method</th>
<th>Description</th>
<th>Parameters</th>
<th>Return Value</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`hasSection`

</td>
<td>
Checks if the course has a section with the given name.
</td>
<td>

section: `string`

</td>
<td>
boolean
</td>
</tr>
<tr>
<td>

`getSection`

</td>
<td>
Gets a specific section of a course.
</td>
<td>

section: `string`

</td>
<td>

Promise<[CourseOffering](#course-offering)>

</td>
</tr>
</tr>
<tr>
<td>

`getSections`

</td>
<td>
Gets all sections of a course.
</td>
<td>

_None_

</td>
<td>

Promise<[CourseOffering](#course-offering)[]>

</td>
</tr>
</tbody>
</table>

#### Course Offering

<table>
<thead>
<tr>
<th>Method</th>
<th>Description</th>
<th>Parameters</th>
<th>Return Value</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`primaryInstructors`

</td>
<td>
Returns all primary instructors of the course.
</td>
<td>

_None_

</td>
<td>
Instructor[]
</td>
</tr>
<tr>
<td>

`secondaryInstructors`

</td>
<td>
Returns all secondary instructors of the course.
</td>
<td>

_None_

</td>
<td>
Instructor[]
</td>
</tr>
</tbody>
</table>

<!-- Contributing. -->

## Contributing

Feel free to fork and create a pull request, or open an issue.

<!-- License. -->

## License

Distributed under the MIT License. See `LICENSE` for more information.

<!-- Contact. -->

## Contact

Ewan Brinkman

Project Link:
[https://github.com/ewanbrinkman/sfuapi](https://github.com/ewanbrinkman/sfuapi)

<!-- Markdown links and images -->

[contributors-shield]:
    https://img.shields.io/github/contributors/ewanbrinkman/sfuapi.svg?style=for-the-badge
[contributors-url]: https://github.com/ewanbrinkman/sfuapi/graphs/contributors
[forks-shield]:
    https://img.shields.io/github/forks/ewanbrinkman/sfuapi.svg?style=for-the-badge
[forks-url]: https://github.com/ewanbrinkman/sfuapi/network/members
[stars-shield]:
    https://img.shields.io/github/stars/ewanbrinkman/sfuapi.svg?style=for-the-badge
[stars-url]: https://github.com/ewanbrinkman/sfuapi/stargazers
[issues-shield]:
    https://img.shields.io/github/issues/ewanbrinkman/sfuapi.svg?style=for-the-badge
[issues-url]: https://github.com/ewanbrinkman/sfuapi/issues
[license-shield]:
    https://img.shields.io/github/license/ewanbrinkman/sfuapi.svg?style=for-the-badge
[license-url]: https://github.com/ewanbrinkman/sfuapi/blob/main/LICENSE
[linkedin-shield]:
    https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/ewan-brinkman
