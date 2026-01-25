import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="container" style={{ paddingTop: '180px', textAlign: 'center', minHeight: '60vh' }}>
            <h1 style={{ fontSize: '4rem', marginBottom: '1rem' }}>404</h1>
            <h2 style={{ marginBottom: '2rem' }}>Project not found</h2>
            <p style={{ marginBottom: '3rem', opacity: 0.7 }}>
                The project you're looking for doesn't exist or has been removed.
            </p>
            <Link href="/" className="btn btn-primary">
                ← Back to Home
            </Link>
        </div>
    );
}
