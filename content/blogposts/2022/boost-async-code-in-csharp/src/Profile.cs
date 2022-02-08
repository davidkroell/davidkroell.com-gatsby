using System;

namespace DavidKroell.BoostAsync;

public record Profile(Guid   UserId,
                      string UserName,
                      string Email,
                      Guid   InstagramId,
                      Guid   GithubId,
                      Guid   LinkedInId)
{
    public byte[]           ProfilePicture   { get; set; }
    public InstagramDetails InstagramDetails { get; set; }
    public GithubDetails    GithubDetails    { get; set; }
    public LinkedInDetails  LinkedInDetails  { get; set; }
}