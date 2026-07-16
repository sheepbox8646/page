export interface GitHubRepositoryMetadata {
  stargazersCount: number
  archived: boolean
}

interface GitHubRepositoryResponse {
  stargazers_count?: unknown
  archived?: unknown
}

const repositoryCache = new Map<string, GitHubRepositoryMetadata>()

export async function getGitHubRepositoryMetadata(
  repository: string,
  signal?: AbortSignal,
): Promise<GitHubRepositoryMetadata> {
  const cached = repositoryCache.get(repository)
  if (cached) return cached

  const response = await fetch(`https://api.github.com/repos/${repository}`, {
    signal,
    headers: {
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
    },
  })

  if (!response.ok) {
    throw new Error(`GitHub request failed with status ${response.status}`)
  }

  const data = (await response.json()) as GitHubRepositoryResponse
  if (
    typeof data.stargazers_count !== 'number' ||
    typeof data.archived !== 'boolean'
  ) {
    throw new Error('GitHub returned invalid repository metadata')
  }

  const metadata = {
    stargazersCount: data.stargazers_count,
    archived: data.archived,
  }
  repositoryCache.set(repository, metadata)

  return metadata
}

export function clearGitHubRepositoryCache() {
  repositoryCache.clear()
}
