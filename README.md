# SFU API Wrapper

An asynchronous TypeScript wrapper for the SFU API.

## Usage

### Example

```typescript
import sfuapi, { CourseOffering } from 'sfuapi';

(async () => {
    const courseOffering: CourseOffering = await sfuapi.courseOffering('cmpt', 120, 'd100', 2021, 'fall');
    console.log(courseOffering);
})();
```

## Contribution

Feel free to submit a pull request.
