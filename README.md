# SFU API Wrapper

An asynchronous TypeScript wrapper for the SFU API.

## Usage

### Example

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

## Contribution

Feel free to submit a pull request.
