# SFU API Wrapper

An asynchronous TypeScript wrapper for the SFU API.

## Usage

### Example

```typescript
import sfuapi, { CourseOffering } from 'sfuapi';

(async () => {
    const courseOfferingData: CourseOffering = await sfuapi.courseOffering('cmpt', 120, 'd100');
    console.log(courseOfferingData);
})();
```
