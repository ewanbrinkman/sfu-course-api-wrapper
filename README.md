<div align="center">

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url] [![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

</div>

<br />
<div align="center">
  <h1 align="center">SFU API Wrapper</h1>

  <p align="center">
    An asynchronous TypeScript wrapper for SFU's API.
    <br />
    <a href="#usage"><strong>Usage Examples</strong></a>
    ·
    <a href="https://ewanbrinkman.github.io/sfu-api-wrapper/"><strong>TypeDoc Documentation</strong></a>
    <br />
    <br />
    <a href="https://github.com/ewanbrinkman/sfu-api-wrapper/issues">Report Bug</a>
    ·
    <a href="https://github.com/ewanbrinkman/sfu-api-wrapper/issues">Request Feature</a>
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
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

## About The Project

This project was made since there is no developed wrapper that I know of for
SFU's API. The goal is to not simply return the JSON data from the API, but
custom classes with useful methods.

**This project is not endorsed or supported by Simon Fraser University.**

## Getting Started

How to set up locally. This package is not currently published to npm.

### Prerequisites

-   node
-   npm _(comes with node)_

### Installation

1. Clone this repository.
    ```sh
    git clone https://github.com/ewanbrinkman/sfu-api-wrapper.git
    ```
2. Go to the directory of `sfu-api-wrapper`.
    ```sh
    cd sfu-api-wrapper
    ```
3. Install NPM packages.
    ```sh
    npm install
    ```
4. Build.
    ```sh
    npm run build
    ```
5. Go to the directory of your own project. Then, install `sfu-api-wrapper` in your own
   project.
    ```sh
    npm install /path/to/local/sfu-api-wrapper/installed/package
    ```

## Usage

Example usage of this API wrapper are shown below. For more detail, including
all the properties each class has, see the
<a href="https://ewanbrinkman.github.io/sfu-api-wrapper/">TypeDoc Documentation</a>.

Note that the API wrapper functions are the default export, while classes
returned by the API wrapper functions and types used by this API wrapper are
named exports.

### Full Basic Example

```typescript
import sfuApiWrapper, { CourseSection } from '@sfu-wrappers/api';

(async () => {
    const courseSection: CourseSection = await sfuApiWrapper.courseSection(
        'cmpt',
        '105w',
        'd100',
        2022,
        'fall',
    );
    console.log(courseSection);
})();
```

### Wrapper Functions

#### Get a course

```typescript
const course: Course = await sfuApiWrapper.course('cmpt', '120', 2021, 'fall');
```

#### Get a course offering

```typescript
const courseSection: CourseSection = await sfuApiWrapper.courseSection(
    'cmpt',
    '120',
    'd100',
    2021,
    'fall',
);
```

### Course Class

For the examples, assume an instance of `Course` called `course` has been
created.

#### Check if a course has a given section

```typescript
const hasSection: boolean = await course.hasSection('d100');
```

#### Get a course offering section of a course

```typescript
const courseSection: CourseSection = await course.getSection('d100');
```

#### Get all course offering sections of a course

```typescript
const courseSections: CourseSection[] = await course.getSections();
```

#### Loop through all course offering sections of a course

```typescript
for await (const courseSection of course) {
    console.log(courseSection);
}
```

## Contributing

Feel free to fork and create a pull request, or open an issue.

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

Ewan Brinkman

Project Link:
[https://github.com/ewanbrinkman/sfu-api-wrapper](https://github.com/ewanbrinkman/sfu-api-wrapper)


## Acknowledgments

- SFU's Course Outlines REST API documentation
    - https://www.sfu.ca/outlines/help/api.html

<!-- Markdown links and images -->

[contributors-shield]:
    https://img.shields.io/github/contributors/ewanbrinkman/sfu-api-wrapper.svg?style=for-the-badge
[contributors-url]: https://github.com/ewanbrinkman/sfu-api-wrapper/graphs/contributors
[forks-shield]:
    https://img.shields.io/github/forks/ewanbrinkman/sfu-api-wrapper.svg?style=for-the-badge
[forks-url]: https://github.com/ewanbrinkman/sfu-api-wrapper/network/members
[stars-shield]:
    https://img.shields.io/github/stars/ewanbrinkman/sfu-api-wrapper.svg?style=for-the-badge
[stars-url]: https://github.com/ewanbrinkman/sfu-api-wrapper/stargazers
[issues-shield]:
    https://img.shields.io/github/issues/ewanbrinkman/sfu-api-wrapper.svg?style=for-the-badge
[issues-url]: https://github.com/ewanbrinkman/sfu-api-wrapper/issues
[license-shield]:
    https://img.shields.io/github/license/ewanbrinkman/sfu-api-wrapper.svg?style=for-the-badge
[license-url]: https://github.com/ewanbrinkman/sfu-api-wrapper/blob/main/LICENSE
[linkedin-shield]:
    https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/ewan-brinkman
